import { type FC } from 'react';
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (item: any) => React.ReactNode;
  noContentMessage?: string;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}
import { Loader2 } from 'lucide-react';
const List: FC<Props> = ({ items, render, noContentMessage, className }) => {
  if (items === undefined) return <Loader2 />;
  if (items.length === 0)
    return (
      <div>
        <p className="font-sm text-gray-600">
          {noContentMessage ?? 'Nic jsme nenašli.'}
        </p>
      </div>
    );
  return <div className={className}>{render(items)}</div>;
};

export default List;
