import RegisterForm from "./registerForm";

export default async function Page(props) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="border border-base text-white rounded-md p-8">
                <div className="mb-4">
                    <h1 className="text-4xl">Register for an Account</h1>
                    <p className="text-gray-400">Create an account to access the dashboard.</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
}
