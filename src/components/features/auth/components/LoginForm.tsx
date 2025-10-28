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
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-8 w-96 bg-gray-700 space-y-8">
        <Typography variant="h4" className="text-center text-white font-bold">
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
            className="rounded-[10px] "
            onClick={onLogin}
          >
            Нэвтрэх
          </Button>
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center ">
              <Checkbox className="text-white ml-[-12px] text-sm" />
              <Typography variant="body2" className="text-white">
                Намайг сана
              </Typography>
            </div>
            <div className="flex justify-center">
              <Typography
                variant="body2"
                className="text-center text-white cursor-pointer"
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
