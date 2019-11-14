# week3-ABEH-trialbytrivia

Things we learnt: 
Fixing encode issues with our API server: Gillian and Ayub found two separate solutions.
Ayub created a dummy HTML element called text area and then retrieved it back out with the coding corrected.
We had realised that the API offered different encoding options so we had initially tried using the base64 option. However it encoded the text in another way that was even worse.
Gillian looked into this and discovered a method called atob which used base64 but corrected the encoding!
