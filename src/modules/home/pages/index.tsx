import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full py-10">
      <ul>
        <li>
          <Link to="../users/list">Users list</Link>
        </li>
      </ul>
    </div>
  );
}
