const search_input=document.querySelector(".search-input");
const search_btn=document.querySelector(".search-btn");
const recipe_generator=document.querySelector(".recipe-generator");
const recipe_details_content=document.querySelector(".recipe-details-content");
const recipe_close_btn=document.querySelector(".recipe-details");


// const openRecipepopup()

const getrecipes =async (data) => {
    recipe_generator.innerHTML="Fetching recipes.."
    try{
        const dt=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`);
    const query = await dt.json();
    recipe_generator.innerHTML=""
    query.meals.forEach(meal => {
        
        const recipediv=document.createElement('div');
        recipediv.classList.add('recipe');
       
        recipediv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> - Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span></p>
            
        
        ` 
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipediv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipepopup(meal);
        })      
        recipe_generator.appendChild(recipediv);
    });

    }
    catch (error){
        recipe_generator.innerHTML="Error in Fetching Recipes..!try another"
    }
    
    
}
const fetchIngredients =(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipepopup=(meal)=>{
    recipe_details_content.innerHTML=`
        <h2 class="recipename">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeinstructions"><h3><p >${meal.strInstructions}</p></></h3></></div>
        
    `
    
    recipe_details_content.parentElement.style.display='block'
}

recipe_close_btn.addEventListener('click',()=>{
    recipe_details_content.parentElement.style.display="none";
})

search_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const data =search_input.value.trim();
    if(!data){
        recipe_generator.innerHTML=`<h2>Type the Meal in the Search Box.</h2>`
        return
    }
    getrecipes(data);
    console.log("clicked!")
})