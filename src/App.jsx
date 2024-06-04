import styled from "styled-components";
import React, { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "https://foody-zone-api-amith.vercel.app/";

const App = () => {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");


  useEffect(() => {
    const fetchFoodData = async () => {

      try {
        const response = await fetch(BASE_URL);
        console.log(response);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        setError("Unable to fetch Data");
        setLoading(false);
      }
    }
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    // console.log(searchValue);
    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };


  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type);
  }


  const filterButtons = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    }
  ]

  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/assets/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} type="text" placeholder="Search Food..." />
          </div>
        </TopContainer>
        <FilterContainer>
          {/* <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterFood("lunch")}>Lunch</Button>
          <Button onClick={() => filterFood("dinner")}>Dinner</Button> */}
          {filterButtons.map(({name, type}, index) => {
            return <Button isSelected={selectedButton === type} key={name} onClick={() => filterFood(type)}>{name}</Button>
          })}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }

`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({isSelected}) => (isSelected ? "#ff0000" : "#ff4343")};
  box-shadow: ${({ isSelected }) => (isSelected ? '3px 4px 5px #4cff6d, -3px 4px 5px #4cff6d' : 'none')};
  outline: 4px solid ${({ isSelected }) => (isSelected ? "black" : "none")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  font-weight: bolder;

  &:hover {
    /* box-shadow: 3px 4px 5px #4cff6d, -3px 4px 5px #4cff6d; */
    cursor: pointer;
    outline: 4px solid black;
    background: #ff0000;
  }
`;