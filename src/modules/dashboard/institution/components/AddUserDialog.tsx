import Button from '@/common/components/ui/button';
import Dialog from '@/common/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import Input from '@/common/components/ui/input';
import InputItem from '@/common/components/ui/inputItem';
import { useAddUser } from '@/common/hooks/api/useAddUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  institutionId: string;
  institutionName: string;
}
const schema = z.object({
  email: z.string().email().min(1).max(255),
  admin: z.boolean(),
});

const AddUserDialog: FC<IProps> = ({
  open,
  setOpen,
  institutionId,
  institutionName,
}) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const { addUser, mutation } = useAddUser();

  useEffect(() => {
    if (mutation.isSuccess) {
      setOpen(false);
    }
  }, [mutation]);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title={`Přidat uživatele do ${institutionName}`}
    >
      <form
        onSubmit={handleSubmit(data => {
          const role = data.admin ? 'ADMIN' : 'USER';
          addUser({ institutionId, data: { email: data.email, role } });
          setOpen(false);
        })}
        className="flex flex-col gap-4"
      >
        <InputItem label="E-mail">
          <Input placeholder="E-mail..." type="email" {...register('email')} />
        </InputItem>
        <InputItem label="Admin">
          <Input type="checkbox" {...register('admin')} />
        </InputItem>
        <Button loading={mutation.isPending} small>
          Přidat uživatele
        </Button>
      </form>
    </Dialog>
  );
};

export default AddUserDialog;
