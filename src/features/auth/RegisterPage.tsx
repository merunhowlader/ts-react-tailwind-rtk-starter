import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Form } from "@/components/ui/form";
import { TextFormField } from "@/components/forms/TextFormField";
import { useRegisterMutation } from "./authApi";
import { registerFormSchema, type RegisterFormValues } from "./register.schema";
import { ROUTES } from "@/routes/routes.config";
import { Link } from "react-router";

export const RegisterPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register(values).unwrap();
      toast.success("Account created — please sign in");
      navigate(ROUTES.login.path);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err.data as { message?: string })?.message
          : undefined;
      toast.error(message ?? "Registration failed");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg border border-border p-6">
        <h1 className="text-xl font-semibold">Create an account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextFormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Jane Doe"
            />
            <TextFormField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            <TextFormField
              control={form.control}
              name="password"
              label="Password"
              type="password"
            />
            <TextFormField
              control={form.control}
              name="confirmPassword"
              label="Confirm password"
              type="password"
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader size="sm" /> : "Create account"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to={ROUTES.login.path}
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
