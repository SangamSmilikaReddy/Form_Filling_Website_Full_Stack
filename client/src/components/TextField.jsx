const TextField = ({ text, name }) => {
  return (
    <input className="Form-Feild" type="text" placeholder={text} name={name} />
  );
};

export default TextField;
