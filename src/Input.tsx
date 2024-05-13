interface InputProps {
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  searchTerm,
  handleChange,
  onKeyDown,
}) => {
  return (
    <input
      type="text"
      placeholder="Search address by id, name, address, pincode, items..."
      value={searchTerm || ""}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
};
