import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (text: string) => void;
  searchQuery: string;
}

const SearchBox = ({ onChange, searchQuery }: SearchBoxProps) => {
  return (
    <input
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchQuery}
    />
  );
};

export default SearchBox;
