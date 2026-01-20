import { Link } from "react-router-dom";
import { Flex } from "@mantine/core";

const NotFoundPage = () => {
  return (
    <Flex direction="column" align="center" justify="center">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to home</Link>
    </Flex>
  );
};

export default NotFoundPage;
