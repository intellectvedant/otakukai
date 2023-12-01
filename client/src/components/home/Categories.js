import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const Styledtable = styled(Table)`
  border: 2px solid #000;
`;

const Styledbutton = styled(Button)`
  border: 2px solid #000;
  background: #64acac;
  color: #000;
  width: 100%;
  padding: 5px;
`;

const Styledlink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <Styledlink
        to={`/create?category=${category || ""}`}
      >
        <Styledbutton variant="contained"> New Post </Styledbutton>
      </Styledlink>

      <Styledtable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Styledlink to="/"> Anime Genres </Styledlink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <Styledlink to={`/?category=${category.type}`}>{category.type}</Styledlink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Styledtable>
    </>
  );
};

export default Categories;
