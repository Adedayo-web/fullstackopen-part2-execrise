import axios from "axios";
import { useEffect, useState } from "react";
import PhoneService from "../components/PhoneService";
import Notification from "../components/Notification";

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
      {props.mapper.map((person) => (
        <>
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => props.onClick(person.id, person.name)}>
              delete
            </button>
          </p>
        </>
      ))}
    </div>
  );
};

const PhoneBook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    PhoneService.getPerson().then((initialData) => {
      console.log("promise fullfilled");
      setPersons(initialData);
    });
  }, []);

  const Delete = (id, name) => {
    const url = `http://localhost:3001/persons/${id}`;
    PhoneService.deletePerson(id)
      .then(() => setPersons((person) => person.filter((n) => n.id !== id)))
      .catch((error) => {
        setPersons((person) => person.filter((n) => n.id !== id));
        setErrorMessage(
          `Information of ${name} has already been removed from the server`,
        );
      });
  };

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
    const existingPerson = persons.find((person) => person.name === newName);
    const namer = { name: newName, number: newNumber };
    if (newName === "" && newNumber === "") {
      alert("you must add a name and a number");
    }
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `This name ${newName} already exists in the list should i update the number?`,
      );
      if (confirmUpdate) {
        // const url = `http://localhost:3001/persons/${id}`;
        PhoneService.updatePerson(existingPerson.id, namer).then(
          (updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person,
              ),
            );
            setNewName("");
            setNewNumber("");
          },
        );
      }
    } else {
      PhoneService.addPerson(namer).then((response) => {
        setPersons(persons.concat(namer));
        setErrorMessage(newName);
        setNewName("");
        setNewNumber("");
      });
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

  useEffect(() => {
    if (errorMessage) {
      const Timer = setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  }, [errorMessage]);

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification message={"Added " + errorMessage} />}
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
      <Persons mapper={notesToShow()} onClick={Delete} />
    </div>
  );
};

export default PhoneBook;
