export const metadata = {
  title: "Contact | NXWS",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-gray-600">We value your feedback and collaboration opportunities.</p>

      <div className="mt-6 rounded-xl border p-5">
        <h2 className="font-medium">Email</h2>
        <a className="text-blue-600 hover:underline" href="mailto:Zhashailesh@gmail.com">Zhashailesh@gmail.com</a>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>For press and partnerships, include your organization and timelines.</p>
      </div>
    </div>
  );
}


