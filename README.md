# technical-test
Technical test

1º The problem is that action b is faster than action a, so if we call them now, the result will be B and A. The beautiful way is to create a function that returns a new promise. This new function will receive as a parameter the function X that will be called within the promise. When calling the function x what we must pass is simply the resolve which will be the callback of the setTimeout.
With this we will achieve a sequential execution of the calls. 
The image "Exercise 1" in this repository show the code that show how work my explanation.

2º 
    º A pagination panel to avoid show all result in the same page (this work if the datasat is too large)
    º A search bar 
    º Buttons in the diference colums to order alphabetically
    º If we don’t use pagination we can add a infinityScroll to show all results in the page without make the page slow
    º Buttons filters in the top part.

3º Assuming the code of the dataset is the id.

    How improve the test
    - debounce in the search
    - pagination or inifinty scroll
    - style
    - split view in diff components 
    - avoid re-render diff components
    - adding unit testing in both parts