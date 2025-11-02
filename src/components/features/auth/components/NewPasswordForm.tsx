import { Button, Card, Input, Typography } from "@mui/material";

export default function NewPasswordForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 space-y-8 bg-gray-700 p-8">
        <Typography variant="h5" className="text-center font-bold text-white">
          Нууц үг шинэчлэх
        </Typography>
        <Input placeholder="Шинэ нууц үг" type="password" fullWidth />
        <Input placeholder="Нууц үг дахин оруулах" type="password" fullWidth />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className="rounded-[10px]"
          onClick={() => {
            console.log("Set New Password Clicked");
          }}
        >
          Нууц үг солих
        </Button>
      </Card>
    </div>
  );
}
