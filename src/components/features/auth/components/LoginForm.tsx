import { Button, Card, Checkbox, Input, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const onForgotPassword = () => {
    router.push("/forgot-password");
    console.log("Forgot Password Clicked");
  };

  const onLogin = () => {
    console.log("Login Clicked");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 space-y-8 bg-gray-700 p-8">
        <Typography variant="h4" className="text-center font-bold text-white">
          Нэвтрэх
        </Typography>
        <Input placeholder="Нэвтрэх нэр" fullWidth />
        <Input placeholder="Нууц үг" type="password" fullWidth />
        <div className="space-y-2">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="rounded-[10px]"
            onClick={onLogin}
          >
            Нэвтрэх
          </Button>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Checkbox className="ml-[-12px] text-sm text-white" />
              <Typography variant="body2" className="text-white">
                Намайг сана
              </Typography>
            </div>
            <div className="flex justify-center">
              <Typography
                variant="body2"
                className="cursor-pointer text-center text-white"
                onClick={onForgotPassword}
              >
                Нууц үгээ мартсан уу?
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
