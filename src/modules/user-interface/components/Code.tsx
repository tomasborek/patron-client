import Input from '@/common/components/ui/input';
import { type FC } from 'react';
interface IProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}
const Code: FC<IProps> = ({ code, setCode }) => {
  return (
    <div className="flex flex-col rounded-md bg-white p-8 shadow-md">
      <Input className="p-8 text-center text-2xl font-bold" value={code} />
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '<'].map(item => (
          <div
            key={item}
            onClick={() => {
              if (item === '<') {
                setCode(code.slice(0, -1));
              } else {
                setCode(code + item);
              }
            }}
            className="cursor-pointer select-none rounded-md bg-gray-100 p-4 py-8 text-center text-xl font-bold text-gray-600"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Code;
