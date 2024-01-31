import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';

export default function Tabbar() {
  const data = [
    {
      label: 'Specification',
      value: 'specification',
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: 'Description',
      value: 'description',
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: 'Question',
      value: 'question',
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: 'Reviews',
      value: 'review',
      desc: 'lorem helow ',
    },
  ];

  return (
    <Tabs value='description'>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab
            activeClassName='bg-white shadow-sm rounded duration-200  ease-linear'
            key={value}
            value={value}
            className='duration-200 ease-linear hover:bg-white/40'
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
