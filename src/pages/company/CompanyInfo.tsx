import companyInfo from '../../data/company-info.txt?raw';

export default function CompanyInfo() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-3xl bg-surface p-8 shadow-xl sm:p-12">
        <h1 className="text-3xl font-extrabold text-heading sm:text-4xl">About Us</h1>
        <p className="mt-6 text-lg leading-relaxed text-body">{companyInfo}</p>
      </div>
    </div>
  );
}
