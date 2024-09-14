import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FileInput } from '@/components';
import { LocationInfo, PersonalInfo } from './components';
import { useCreateUser, useEditUser, useGetUser } from '../../hooks';
import { CreateUser, createUserSchema } from '../../schema';
import UserEditSkeleton from './user-edit-skeleton';

export default function UserCreate() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { isLoading, refetch } = useGetUser(userId);
  const { isPending: isCreating, mutate: createUser } = useCreateUser();
  const { isPending: isEditing, mutate: editUser } = useEditUser();

  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
  });

  function onSubmit(data: CreateUser) {
    if (userId) {
      editUser(
        { userId, data },
        {
          onSuccess(res) {
            navigate(`../${res.userId}`);
          },
        }
      );
    } else {
      createUser(data, {
        onSuccess(res) {
          navigate(`../${res.userId}`);
        },
      });
    }
  }

  useEffect(() => {
    if (userId) {
      refetch().then(({ data }) => {
        form.reset({
          imageUrl: data?.picture.large,
          firstName: data?.name.first,
          lastName: data?.name.last,
          email: data?.email,
          phone: data?.phone,
          dob: data?.dob.date ? new Date(data?.dob.date) : undefined,
          country: data?.location.country,
          city: data?.location.city,
          postalCode: data?.location.postcode,
        });
      });
    }
  }, [form, refetch, userId]);

  if (isLoading) {
    return <UserEditSkeleton />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 p-10"
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{userId ? 'Edit' : 'New'} User</h1>
          <Button className="gap-2" disabled={isCreating || isEditing}>
            {userId ? 'Update' : 'Create'}
          </Button>
        </div>

        <Card className="flex gap-5 p-6 !bg-transparent">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div
                  className="bg-no-repeat bg-cover rounded-xl w-fit"
                  style={
                    field.value
                      ? {
                          backgroundImage: `url(${URL.createObjectURL(field.value)})`,
                        }
                      : {
                          backgroundImage: `url(${form.getValues('imageUrl')})`,
                        }
                  }
                >
                  <FormControl>
                    <FileInput
                      accept={{ 'image/*': [] }}
                      multiple={false}
                      onChange={(files) => {
                        field.onChange(files?.[0]);
                      }}
                      className="w-80 h-80"
                      placeholder="Drag 'n' drop here, or click to select a profile picture"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="!bg-transparent">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
            <PersonalInfo />
          </CardContent>
        </Card>

        <Card className="!bg-transparent">
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
            <LocationInfo />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
