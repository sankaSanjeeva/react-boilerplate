import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LocationInfo, PersonalInfo } from './components';
import { FileInput } from '@/components';

const formSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= 1024 * 1024 * 2;
    }, 'File size must be less than 2MB')
    .refine((file) => {
      return file?.type.startsWith('image');
    }, 'File must be an image'),
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
        className="flex flex-col w-full gap-5 p-10"
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
              <FormItem>
                <div
                  className="bg-no-repeat bg-cover rounded-xl w-fit"
                  style={
                    field.value
                      ? {
                          backgroundImage: `url(${URL.createObjectURL(field.value)})`,
                        }
                      : undefined
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
