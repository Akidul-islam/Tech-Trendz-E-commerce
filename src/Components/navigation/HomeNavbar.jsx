import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Badge,
} from "@material-tailwind/react";
import { GiRoyalLove, GiToggles } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import { useTypeSelector } from "../../Redux/Store";
import { BsCartCheck } from "react-icons/bs";
import SidebarDrawer from "../common/SidebarDrewer";
import CartSingle from "../Layout/CartSingle";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(({ title, description }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {/* {' '}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: 'h-6 text-gray-900 w-6',
            })} */}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-bold"
          >
            {title}
          </Typography>
          <Typography
            variant="paragraph"
            className="text-xs !font-medium text-blue-gray-500"
          >
            {description}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="h6" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              {/* <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`} */}
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row text-gray-900/80  lg:p-1">
      <Typography as="a" href="#" variant="h6" className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="h6"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

const HomeNavber = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isCart, setIsCart] = useState(false);
  const [wishList, setWishList] = useState(false);
  const { isAuthenticate, user } = useTypeSelector((state) => state.auth);

  const cartHandler = () => setIsCart(!isCart);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <>
      <Navbar className="mx-auto z-10  max-w-screen  px-4 py-3 rounded-none">
        <div className="flex items-center justify-between">
          <RouterLink to={"/"}>
            <Typography
              variant="h6"
              className="mr-4 text-teal-800/90 text-lg cursor-pointer py-1.5 lg:ml-2"
            >
              TECH TRENDZ
            </Typography>
          </RouterLink>
          <div className="hidden lg:block">
            <NavList />
          </div>

          <div className="flex gap-2 lg:gap-6">
            <Badge
              content="10"
              overlap="circular"
              className="absolute -top-2 left-5"
            >
              <Tooltip content="Wishlist" placement="bottom" className="z-10">
                <button className="nav-icon-btn text-2xl shadow-sm px-2 py-1 rounded-sm">
                  <GiRoyalLove />
                </button>
              </Tooltip>
            </Badge>
            <Badge content="15" className="absolute -top-2 left-4">
              <Tooltip content="Cart Item" className="z-10">
                <button className="nav-icon-btn" onClick={cartHandler}>
                  <BsCartCheck />
                </button>
              </Tooltip>
            </Badge>

            <button
              className="nav-icon-btn text-xl lg:hidden "
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? <MdRestaurantMenu /> : <GiToggles />}
            </button>
            <div className="">
              {isAuthenticate ? (
                <RouterLink to={'/customer'}>
                  <div>
                    <Avatar
                      src={user.photoURL}
                      className="border border-gray-900/70"
                      alt={"avater"}
                      size="sm"
                    />
                  </div>
                </RouterLink>
              ) : (
                <RouterLink to={"/login"}>
                  <Button className=" text-teal-700 border-teal-800" size="sm">
                    Login
                  </Button>
                </RouterLink>
              )}
            </div>
          </div>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
      {/* cart */}
      <SidebarDrawer
        className=""
        open={isCart}
        title={"Cart Item Products"}
        handler={cartHandler}
      >
        {/* <CartSingle data={[{}]} /> */}
      </SidebarDrawer>
    </>
  );
};

export default HomeNavber;
