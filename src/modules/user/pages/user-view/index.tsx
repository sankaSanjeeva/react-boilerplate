import { useParams } from 'react-router-dom';
import { useGetUser } from '../../hooks';
import { Button } from '@/components/ui/button';
import { PencilIcon } from '@/assets/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserViewSkeleton from './user-view-skeleton';

export default function UserView() {
  const { userId } = useParams();

  const { data: user, isLoading } = useGetUser(userId ?? '123456'); // some times randomuser.me return null for userId

  if (isLoading) {
    return <UserViewSkeleton />;
  }

  return (
    <div className="flex flex-col gap-5 p-10 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button className="gap-2">
          <PencilIcon className="h-5 w-5" />
          <span>Edit</span>
        </Button>
      </div>

      <Card className="flex gap-5 p-6 !bg-transparent">
        <img
          src={user?.picture.medium}
          alt="user-profile"
          className="w-20 h-20 object-cover rounded-full"
        />
        <div className="flex flex-col justify-between">
          <span className="text-xl font-semibold">{`${user?.name.first} ${user?.name.last}`}</span>
          <span className="opacity-80 break-all">{user?.email}</span>
          <span className="opacity-80 break-all">{`${user?.location.street.name}, ${user?.location.state}, ${user?.location.city}`}</span>
        </div>
      </Card>

      <Card className="!bg-transparent">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div className="flex flex-col gap-2">
            <span className="text-gray-400">First Name</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.name.first}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400">Last Name</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.name.last}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400">Email address</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.email}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400">Phone</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.phone}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400">Birthday</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.dob.date && new Date(user?.dob.date).toDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="!bg-transparent">
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div className="flex flex-col gap-2">
            <span className="text-gray-400">Country</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.location.country}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400">City/State</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.location.state}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400">Postal Code</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.location.postcode}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400">Timezone</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.location.timezone.description}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
