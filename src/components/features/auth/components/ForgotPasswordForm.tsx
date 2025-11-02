import { Button, Card, Input, Typography } from "@mui/material";

export default function ForgotPasswordForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 space-y-8 bg-gray-700 p-8">
        <Typography variant="h5" className="text-center font-bold text-white">
          Нууц үг сэргээх
        </Typography>
        <Input placeholder="Имэйл хаяг" fullWidth />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className="rounded-[10px]"
          onClick={() => {
            console.log("Reset Password Clicked");
          }}
        >
          Нууц үг сэргээх
        </Button>
      </Card>
    </div>
  );
}
