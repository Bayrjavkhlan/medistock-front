import { Button, Card, Input, Typography } from "@mui/material";

export default function ForgotPasswordForm() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-8 w-96 bg-gray-700 space-y-8">
        <Typography variant="h5" className="text-center text-white font-bold">
          Нууц үг сэргээх
        </Typography>
        <Input placeholder="Имэйл хаяг" fullWidth />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className="rounded-[10px] "
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
