import { useState } from "react";

const Personforms = (props) => {
  return (
    <form onSubmit={props.form}>
      {props.name} <input value={props.value} onChange={props.click} />
    </form>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with{" "}
      <input type="text" value={props.value} onChange={props.onChange} />
    </div>
  );
};

{
  /* <form onSubmit={addName}>
  <div>
    name: <input value={newName} onChange={inputNameValue} />
  </div>
  <div>
    number: <input value={newNumber} onChange={inputNumberValue} />
  </div>

  <button type="submit">Add</button>
</form>; */
}

const Personform = (props) => {
  return (
    <form onSubmit={props.form}>
      <div>
        name: <input value={props.nameVal} onChange={props.nameFunction} />
      </div>
      <div>
        number:{" "}
        <input value={props.numberVal} onChange={props.numberFunction} />
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.mapper.map((person, index) => (
        <p key={index + 1}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const datar = [
  { name: "Arto Hellas", number: "08033018891" },
  { name: "Elvin Macky", number: "08012345678" },
  { name: "Allisa Union", number: "08087654321" },
  { name: "Louis Faraday", number: "0812349769" },
];

const App = () => {
  const [persons, setPersons] = useState(datar);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const inputNameValue = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };
  const inputNumberValue = (event) => {
    setNewNumber(event.target.value);
    console.log(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    if (newName === "" && newNumber === "") {
      alert("you must add a name and a number");
    }
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already exists in the list`);
    }
    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} already exists in the list`);
    } else {
      const namer = { name: newName, number: newNumber };
      setPersons(persons.concat(namer));
      setNewName("");
      setNewNumber("");
      console.log(persons);
    }
  };

  const notesToShow = () => {
    if (search === "") {
      return persons;
    } else {
      const data = persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      );
      return data;
    }
  };

  const Filterer = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={Filterer} />

      <h2>add a new</h2>

      <Personform
        form={addName}
        nameVal={newName}
        nameFunction={inputNameValue}
        numberVal={newNumber}
        numberFunction={inputNumberValue}
      />

      <h2>Number</h2>
      <Persons mapper={notesToShow()} />
    </div>
  );
};

export default App;
