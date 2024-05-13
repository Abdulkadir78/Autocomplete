import { useMemo, useState } from "react";

import { USERS } from "./data";
import { Input } from "./Input";
import { UserList } from "./UserList";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  // instead of this, we could do a debounced search to avoid filtering on every key stroke within a certain time frame
  const filteredUsers = useMemo(() => {
    setActiveIndex(-1);

    const term = searchTerm.toLowerCase();

    if (term) {
      return USERS.filter((user) => {
        return (
          user.id.toLowerCase().includes(term) ||
          user.name.toLowerCase().includes(term) ||
          user.address.toLowerCase().includes(term) ||
          user.pincode.toLowerCase().includes(term) ||
          user.items.some((item) => item.toLowerCase().includes(term))
        );
      });
    } else {
      return [];
    }
  }, [searchTerm]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const scrollToActiveUser = () => {
    requestAnimationFrame(() => {
      // imperatively scroll to the active user
      const activeUserElement = document.querySelector(
        ".user-container.active"
      );

      if (activeUserElement) {
        activeUserElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // set active index base on arrow up and down key
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredUsers.length - 1 ? prev + 1 : prev
      );

      scrollToActiveUser();
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      scrollToActiveUser();
    }
  };

  return (
    <>
      <div className="container">
        <Input
          searchTerm={searchTerm}
          handleChange={handleChange}
          onKeyDown={onKeyDown}
        />

        {searchTerm && (
          <UserList
            searchTerm={searchTerm}
            users={filteredUsers}
            activeIndex={activeIndex}
            onMouseEnter={(index: number) => {
              setActiveIndex(index);
            }}
            onMouseLeave={() => {
              setActiveIndex(-1);
            }}
          />
        )}
      </div>
    </>
  );
};

export default App;
