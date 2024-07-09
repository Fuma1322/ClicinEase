import { getUserById } from "@/actions/users";
import TrackingForm from "@/components/Frontend/TrackingForm";
 
export default async function VerifyAccount(
  //{
  //params: { id },
//}: {
 // params: { id: string };
//}
) {
  //Get a Users
  //const user = await getUserById(id);
  //const userToken = user?.token;
  //const role = user?.role;
  return (
    <section className="bg-black dark:bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-gray-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Resume Application
            </h1>
            <TrackingForm />
          </div>
        </div>
      </div>
    </section>
  );
}