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

export const DashboardContact = () => {
  const { data: contactsObj } = useQuery(GET_CONTACTS);
  if (contactsObj) {
    console.log(contactsObj);
  }

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
        <ContactByFirstLetter />
        <ContactByFirstLetter />
        <ContactByFirstLetter />
        <ContactByFirstLetter />
        <ContactByFirstLetter />
        <ContactByFirstLetter />
      </div>
    </>
  );
};
