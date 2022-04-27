import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './RecipesContext';

const RecipeContextProvider = ({ children }) => {
  // Utilizando somente um data para Drinks e Meals, pois os 2 não estarão renderizados ao mesmo tempo.
  const [data, setData] = useState([]);
  // Deixa os inputs controlados.
  const [filter, setFilter] = useState('');
  const [textFilter, setTextFilter] = useState('');

  // Requisições das Api's de comidas.
  // Caso não receba nenhuma receita, retorna um alerta.
  const ALERT_NO_RECIPE = 'Sorry, we haven\'t found any recipes for these filters.';

  // Usa o Hook useHistory para manipular a url.
  const history = useHistory();
  const redirectToDetail = (result) => {
    const recipeOne = result[0];
    const id = Object.keys(recipeOne)[0];
    history.push(`${history.location.pathname}/${recipeOne[id]}`);
  };

  const requestInitialFood = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const { meals } = await response.json();
    setData(meals);
  };

  const requestInitialDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const { drinks } = await response.json();
    console.log(drinks);
    setData(drinks);
  };

  const requestFoodsByFilter = async () => {
    const urlFilter = filter === 'i' ? 'filter' : 'search';
    const url = `https://www.themealdb.com/api/json/v1/1/${urlFilter}.php?${filter}=${textFilter}`;
    const response = await fetch(url);
    const { meals } = await response.json();
    if (meals === null) {
      global.alert(ALERT_NO_RECIPE);
      return setData([]);
    }
    setData(meals);
    if (meals.length === 1) {
      redirectToDetail(meals);
    }
  };

  // Requisições das Api's de drinks.
  // Caso não receba nenhuma receita, retorna um alerta.
  const requestDrinksByFilter = async () => {
    const urlFilter = filter === 'i' ? 'filter' : 'search';
    const url = `https://www.thecocktaildb.com/api/json/v1/1/${urlFilter}.php?${filter}=${textFilter}`;
    const response = await fetch(url);
    const { drinks } = await response.json();
    if (drinks === null) {
      global.alert(ALERT_NO_RECIPE);
      return setData([]);
    }
    setData(drinks);
    if (drinks.length === 1) {
      redirectToDetail(drinks);
    }
  };

  // Caso esteja na página foods, solicita Api's de comida.
  // Caso esteja na página drinks, solicita Api's de drinks.
  const foodsOrDrinksByFilter = () => {
    if (history.location.pathname === '/foods') {
      requestFoodsByFilter();
    }
    if (history.location.pathname === '/drinks') {
      requestDrinksByFilter();
    }
  };

  // Caso esteja na página foods, solicita Api's de comida.
  // Caso esteja na página drinks, solicita Api's de drinks.
  const requestAPIInitial = () => {
    if (history.location.pathname === '/foods') {
      requestInitialFood();
    }
    if (history.location.pathname === '/drinks') {
      requestInitialDrink();
    }
  };

  // Funções para filtrar por tipo de Radio selecionado.
  const requestAPIByFilter = (event) => {
    event.preventDefault();
    if (filter === 'f') {
      // Caso o filtro de por letra inicial receba mais de uma letra, retorna um alerta.
      if (textFilter.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      return foodsOrDrinksByFilter();
    }
    return foodsOrDrinksByFilter();
  };

  const contextValue = {
    data,
    setData,
    filter,
    setFilter,
    textFilter,
    setTextFilter,
    requestAPIByFilter,
    requestAPIInitial,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeContextProvider;
