import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useQuery } from '@apollo/client';

import { AddIcon } from 'assets/icons';
import {
  ContactModal,
  ContactByFirstLetter,
} from 'pages/Dashboard/DashboardContact';
import { SearchBar } from 'components/SearchBar';
import { GET_CONTACTS } from 'graphql/contacts';

const Group = ({ name, contacts }) => {
  return (
    <div className='font-bold pl-10 pr-5 mb-6'>
      <h2 className='text-blue-300'>{name}</h2>
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
  const { data: contactsObj } = useQuery(GET_CONTACTS, {
    variables: {
      isEstablished: true,
    },
  });

  if (!contactsObj) return;

  const contactsWithGroup = contactsObj.contacts.map((contact) => {
    const { username, email, id } = contact.friend;
    const name = username ? username : email.split('@')[0];
    const groupName = name.charAt(0).toUpperCase();
    if (!groupNames.includes(groupName)) {
      setGroupNames([...groupNames, groupName].sort());
    }
    return { id, name, groupName };
  });

  return (
    <>
      <div className='p-6 pb-2 mb-10'>
        <div className='flex justify-between'>
          <p className='text-2xl font-bold'>Contacts</p>
          <ContactModal
            triggerButton={
              <Tippy
                content={<b style={{ color: '#cbd5e1' }}>Add Contact</b>}
                allowHTML={true}
              >
                <img src={AddIcon} alt='Add Contact' className='w-7' />
              </Tippy>
            }
          />
        </div>
        <SearchBar placeholder='Search Users' />
      </div>

      <div className='overflow-y-scroll scrollbar-transparent hover:scrollbar mr-1 mb-3'>
        {groupNames.map((groupName) => (
          <Group
            key={groupName}
            name={groupName}
            contacts={contactsWithGroup}
          />
        ))}
      </div>
    </>
  );
};
