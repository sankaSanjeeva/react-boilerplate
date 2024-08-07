import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { LocationInfo, PersonalInfo } from './components';
import { FileInput } from '@/components';

const formSchema = z.object({
  image: z.any().refine((files) => files?.length === 1, 'Image is required.'),
  firstName: z.string().min(2, 'First name must be at least 2 characters.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
  email: z.string().email('Email must be a valid email address'),
  phone: z.string({ required_error: 'Phone number is required' }),
  dob: z.date({ message: 'Birthday must be a valid date' }),
  country: z.string({ required_error: 'Country number is required' }),
  city: z.string({ required_error: 'City number is required' }),
  postalCode: z.string({ message: 'Must be a valid postal code' }),
});

type FormType = z.infer<typeof formSchema>;

export default function UserCreate() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-10 w-full"
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">New User</h1>
          <Button className="gap-2">Create</Button>
        </div>

        <Card className="flex gap-5 p-6 !bg-transparent">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem
                className="w-full max-w-2xl bg-cover bg-no-repeat rounded-xl overflow-hidden"
                style={
                  field.value
                    ? {
                        backgroundImage: `url(${URL.createObjectURL(field.value[0])})`,
                      }
                    : undefined
                }
              >
                <FormControl>
                  <FileInput
                    accept={{ 'image/*': [] }}
                    multiple={false}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Card>

        <Card className="!bg-transparent">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <PersonalInfo />
          </CardContent>
        </Card>

        <Card className="!bg-transparent">
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <LocationInfo />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
