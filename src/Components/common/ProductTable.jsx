// import {} from 'prop-types';
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Rating,
  Checkbox,
} from '@material-tailwind/react';
import { BsPencilSquare } from 'react-icons/bs';
import { HiChevronUpDown } from 'react-icons/hi2';

const TABLE_HEAD = [
  'Product Name',
  'SKU',
  'STOCK',
  'PRICE',
  'CATEGORY',
  'STATISTICS',
  'STATUS',
  'TYPE',
  'RATE',
  'DATE',
  'ACTION',
];

const TABLE_ROWS = [
  {
    productName: 'shirt',
    brand: 'Gucci',
    regularPrice: 60,
    category: 'Electornics',
    statistics: 'Top Rated',
    status: 'Active',
    type: 'Digital',
    rate: 4,
    date: '12/3/2023',
    sku: 'pwewf',
    stock: 10,
    id: '124',
    variant: [{ attribute: '', values: [] }],
    images: [
      'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    ],
  },
];

const arrowShow = {
  'Product Name': 'Product Name',
  STOCK: 'STOCK',
  PRICE: 'PRICE',
  STATUS: 'STATUS',
  CATEGORY: 'CATEGORY',
};

const ProductTable = () => {
  return (
    <Card className='h-full w-full'>
      <CardBody className='overflow-scroll px-0'>
        <table className='mt-4 w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              <th className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 transition-colors hover:bg-blue-gray-50'>
                <Checkbox defaultChecked color='teal' />
              </th>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                >
                  <Typography
                    variant='small'
                    // color='blue-gray's
                    className='flex items-center justify-between gap-2 font-medium font-Roboto leading-none opacity-70'
                  >
                    {head}{' '}
                    {head == arrowShow[head] && (
                      <HiChevronUpDown strokeWidth={2} className='h-4 w-4' />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  productName,
                  category,
                  regularPrice,
                  statistics,
                  status,
                  stock,
                  images,
                  id,
                  date,
                  rate,
                  type,
                  sku,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'py-2'
                  : 'py-2 border-b border-blue-gray-50';

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className='p-4'>
                        {/* <Checkbox
                          className='rounded-none text-teal-800'
                          checked={true}
                          color='teal'
                        /> */}
                        <input type='checkbox' className='border text' />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar src={images[0]} alt={productName} size='sm' />
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {productName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {sku}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          <span className='text-teal-700 font-medium'>
                            In-Stock
                          </span>{' '}
                          {stock}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {regularPrice}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {category}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {statistics}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {status}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {type}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div>
                        <Rating value={rate} className='flex text-sm' />
                      </div>
                    </td>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {date}
                        </Typography>
                      </div>
                    </td>
                    <td className=''>
                      <Tooltip content='Edit User'>
                        <IconButton variant='text' className='mb-3'>
                          <BsPencilSquare className='h-4 w-4' />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page 1 of 10
        </Typography>
        <div className='flex gap-2'>
          <Button variant='outlined' size='sm'>
            Previous
          </Button>
          <Button variant='outlined' size='sm'>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductTable;
