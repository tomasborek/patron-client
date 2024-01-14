import { useMutation } from "react-query";
import { UserService } from "@/lib/services/user.service";
import { useAuth } from "@/common/contexts/AuthContext";
import toast from "react-hot-toast";

export const useLogin = () => {
  const userService = new UserService();
  const { login } = useAuth();

  const mutation = useMutation(
    (data: { email: string; password: string }) =>
      userService.auth(data.email, data.password),
    {
      onSuccess: (data: { data: { data: { token: string } } }) => {
        login(data.data.data.token);
        toast.success("Přihlášení proběhlo úspěšně");
      },
      onError: (error) => {
        toast.error("Něco se pokazilo");
      },
    },
  );

  return {
    login: mutation.mutate,
    query: mutation,
  };
};
