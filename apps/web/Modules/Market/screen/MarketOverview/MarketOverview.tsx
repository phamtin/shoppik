import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateProfile } from 'Modules/user/hook/user.hook';
import { ConfirmDialog, FormField } from 'ui/components';
import { Button, Typography, Input } from 'ui/components/Core';

interface ProfileProp {}

const ProfileScreen = ({}: ProfileProp) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: mutateUserProfile } = useUpdateProfile();

  const handleSubmitData = (data: any) => {
    mutateUserProfile(data);
  };
  console.log('WTF');

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
        <Typography component="h2">Update Profile</Typography>
        <Controller
          name="firstname"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 2,
              message: 'This field is too short',
            },
          }}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="lastname"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Input type="email" disabled />
        <Button>Submit</Button>
      </form>
      <ConfirmDialog
        isOpen={isOpen}
        title="Remove user?"
        content="Are you sure to permenant remove this user, this action can't be undo."
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ProfileScreen;
