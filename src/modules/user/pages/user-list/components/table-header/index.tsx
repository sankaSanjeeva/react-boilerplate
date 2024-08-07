import { Link } from 'react-router-dom';
import { MagnifierIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function TableHeader({ searchValue, setSearchValue }: Props) {
  return (
    <div className="flex justify-between gap-5 py-5 px-2">
      <div className="relative w-full">
        <MagnifierIcon
          className="absolute left-3 top-1/2 -translate-y-1/2"
          fillOpacity={0.5}
        />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-md pl-12 h-12 rounded-xl text-base placeholder:italic !bg-transparent"
          placeholder="Search..."
        />
      </div>
      <Link to="../create">
        <Button className="h-12 rounded-xl text-base">+ Add member</Button>
      </Link>
    </div>
  );
}
