import { User } from "./data";

interface UserListProps {
  searchTerm: string;
  users: User[];
  activeIndex: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

export const UserList: React.FC<UserListProps> = ({
  searchTerm,
  users,
  activeIndex,
  onMouseEnter,
  onMouseLeave,
}) => {
  const highlight = (text: string) => {
    const subString = new RegExp(`(${searchTerm})`, "gi");

    const parts = text.split(subString);

    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={i}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const foundInList = (items: string[]) => {
    return items.some((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="user-list">
      {!users.length && <p className="no-data">No user found</p>}

      {users.map((user, i) => {
        return (
          <div
            key={user.id}
            className={"user-container" + (activeIndex === i ? " active" : "")}
            onMouseEnter={() => {
              onMouseEnter(i);
            }}
            onMouseLeave={onMouseLeave}
          >
            <h2 className="text-sm">{highlight(user.id)}</h2>
            <h2 className="text-lg">{highlight(user.name)}</h2>

            {foundInList(user.items) && (
              <ul>
                <li className="text-md">
                  <mark>{searchTerm}</mark> found in list
                </li>
              </ul>
            )}

            <p className="text-md">{highlight(user.address)}</p>
            <p className="text-md">{highlight(user.pincode)}</p>
          </div>
        );
      })}
    </div>
  );
};
