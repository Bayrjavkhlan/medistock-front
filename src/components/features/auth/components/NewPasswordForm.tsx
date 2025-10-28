import { Button, Card, Input, Typography } from "@mui/material";

export default function NewPasswordForm() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-8 w-96 bg-gray-700 space-y-8">
        <Typography variant="h5" className="text-center text-white font-bold">
          Нууц үг шинэчлэх
        </Typography>
        <Input placeholder="Шинэ нууц үг" type="password" fullWidth />
        <Input placeholder="Нууц үг дахин оруулах" type="password" fullWidth />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className="rounded-[10px] "
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
