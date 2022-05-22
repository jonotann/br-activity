// This file will be provided once the challenge is started.

import React, { useState, useEffect } from "react";
import { getUsers, createUser, createUserWithId, removeUser } from "./ApiService";
import "./styles.css";

const CreateUserForm = ({ createUser }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
    };

    return (
        <form
            onSubmit={(createUserEvent) => {
                createUserEvent.preventDefault();
                createUser(firstName, lastName, email);
                resetForm();
            }}
        >
            <input
                className="input-text"
                name="firstName"
                placeholder="First"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />
            <input
                className="input-text"
                name="lastName"
                placeholder="Last"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />
            <input
                className="input-text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input className="button" type="submit" value="Add User" />
        </form>
    );
};

const ListUsers = ({ users, removeUser }) => (
    <div>
        <ul className="user-list">
            {users.map((user) => (
                <li className="user-detail" key={user.userId}>
                    <span className="display-text">{user.firstName}</span>
                    <span className="display-text">{user.lastName}</span>
                    <span className="display-text">{user.email}</span>
                    <button onClick={() => removeUser(user)}>X</button>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = ({ undo, redo }) => (
    <div className="footer">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
    </div>
);

export default function App() {
    /* TODO implement me - use mock API */
    const [users, setUsers] = useState([]);
    const [changes, setChanges] = useState([]);

    const lastChange = changes[changes.length - (1)];

    const lastChangedUser = {
        firstName: lastChange?.firstName,
        lastName: lastChange?.lastName,
        email: lastChange?.email,
        id: lastChange?.id,
    };

    const createNewUser = async (firstName, lastName, email) => {
        /* TODO implement me */
        const id = null;

        createUser(firstName, lastName, email).then((res) => {
            id = res;
        });

        const userObj = {
            firstName,
            lastName,
            email,
            id,
        };

        setUsers([...users, userObj]);
        setChanges([...changes, { userObj, type: 'user created' }]);
    };

    const removeExistingUser = (user) => {
        /* TODO implement me */
        if (user.id) {
            removeUser(user.id);
            setChanges([...changes, { user, type: 'user removed' }]);
        }

        if (!user.id) {
            alert(`No id associated to email: ${user.email}`);
        }
    };

    const undo = () => {
        /* TODO implement me */

        if (lastChange) {
            if (lastChangedUser) {
                if (lastChange.type === 'user created') {
                    removeUser(lastChangedUser.id);
                    setChanges([...changes, { lastChangedUser, type: 'undone creation' }]);
                }

                if (lastChange.type === 'user removed') {
                    createUserWithId(...lastChangedUser);
                    setChanges([...changes, { lastChangedUser, type: 'undone removal' }])
                }
            }
        }
    };

    const redo = () => {
        /* TODO implement me */

        if (lastChange) {
            if (lastChangedUser) {
                if (lastChange.type === 'undone creation') {
                    createUserWithId(...lastChangedUser);
                    setChanges([...changes, { lastChangedUser, type: 'redone creation' }]);
                }

                if (lastChange.type === 'undone removal') {
                    removeUser(lastChangedUser.id);
                    setChanges([...changes, { lastChangedUser, type: 'redone removal' }]);
                }
            }
        }
    };

    useEffect(() => {
        const latestUsers = getUsers();

        setUsers(latestUsers);
    }, []);

    return (
        <div className="App">
            <h1>Create User</h1>
            <CreateUserForm createNewUser={createNewUser} />
            <ListUsers users={users} removeExistingUser={removeExistingUser} />
            <Footer undo={undo} redo={redo} />
        </div>
    );
}