import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useQuery } from "@apollo/client";

import { AddIcon } from "assets/icons";
import {
  ContactModal,
  ContactByFirstLetter,
} from "pages/Dashboard/DashboardContact";
import { SearchBar } from "components/SearchBar";
import { GET_CONTACTS } from "graphql/contacts";

const ContactGroup = ({ name, contacts }) => {
  const currentGroups = contacts.map((contact) => contact.groupName);
  if (!currentGroups.includes(name)) return;

  return (
    <div className="font-bold pl-10 pr-5 mb-5">
      <h2 className="text-blue-300 text-lg">{name}</h2>
      {contacts.map((contact) => {
        if (contact.groupName === name) {
          return <ContactByFirstLetter key={contact.id} {...contact} />;
        }
        return <div key={contact.id} />;
      })}
    </div>
  );
};

export const DashboardContact = () => {
  const [groupNames, setGroupNames] = useState([]);
  const [currentContacts, setCurrentContacts] = useState([]);
  const [contactsBySearch, setContactsBySearch] = useState(currentContacts);
  let groups = [];

  const onGetContacts = (contacts) => {
    const contactsWithGroup = contacts.map((contact) => {
      const { username, email } = contact.friend;
      const name = username ? username : email.split("@")[0];
      const groupName = name.charAt(0).toUpperCase();

      if (!groups.includes(groupName)) {
        groups.push(groupName);
        groups.sort();
      }
      setGroupNames(groups);
      return { id: contact.id, name, groupName };
    });
    setCurrentContacts(contactsWithGroup);
    setContactsBySearch(contactsWithGroup);
  };

  useQuery(GET_CONTACTS, {
    variables: {
      isEstablished: true,
    },
    onCompleted: (data) => {
      onGetContacts(data.contacts);
    },
  });

  const handleSearchContacts = (searchValue) => {
    if (!searchValue.trim()) {
      setContactsBySearch(currentContacts);
      return;
    }
    const searchValueInLowerCase = searchValue.toLowerCase();
    const contactsAfterFilter = currentContacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchValueInLowerCase)
    );
    setContactsBySearch(contactsAfterFilter);
  };

  return (
    <>
      <div className="p-6 pb-2 mb-10">
        <div className="flex justify-between">
          <p className="text-2xl font-bold">Contacts</p>
          <ContactModal
            triggerButton={
              <Tippy
                content={<b style={{ color: "#cbd5e1" }}>Add Contact</b>}
                allowHTML={true}
              >
                <img src={AddIcon} alt="Add Contact" className="w-7" />
              </Tippy>
            }
          />
        </div>
        <SearchBar
          placeholder="Search Contacts"
          handleSearch={handleSearchContacts}
        />
      </div>

      <div className="h-[78%] overflow-y-scroll scrollbar-transparent hover:scrollbar mr-1 mb-3">
        {groupNames.map((groupName) => (
          <ContactGroup
            key={groupName}
            name={groupName}
            contacts={contactsBySearch}
            group={groupNames}
          />
        ))}
      </div>
    </>
  );
};
