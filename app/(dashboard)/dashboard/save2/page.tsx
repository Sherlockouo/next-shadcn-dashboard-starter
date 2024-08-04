import Save2Notion from '@/components/save2/notion';

export default function page() {
  return (
    <div className="grid flex-1 grid-cols-12 space-y-4 p-4 pt-6 md:p-8">
      <div className="col-span-3 rounded-md border-2 border-double  border-gray-100 p-2">
        <Save2Notion />
      </div>
    </div>
  );
}
