import { FC } from "react";
interface Props {
  items: any[] | undefined;
  render: (item: any) => React.ReactNode;
  noContentMessage?: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}
import { Loader2 } from "lucide-react";
const List: FC<Props> = ({ items, render, noContentMessage, className }) => {
  if (items === undefined) return <Loader2 />;
  if (items.length === 0)
    return (
      <div className={className}>
        <p className="font-sm text-gray-600">
          {noContentMessage || "Nic jsme nenašli."}
        </p>
      </div>
    );
  return render(items);
};

export default List;
