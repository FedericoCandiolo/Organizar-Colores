# Organizar-Colores
Dados ciertos colores, se organizan de la manera más fluida posible posible, manteniendo el primer color que fue dado.
Se busca el color más cercano al actual que aún se encuentre disponible y pasa a formar parte de la lista de colores ordenados.Luego, se busca el color disponible más cercano y se repite la acción hasta haber ordenado todos los colores.
Los colores repetidos son filtrados para que queden valores únicos.

## El color más cercano
Un color, en RGB, tiene 3 componentes: rojo, verde y azul. La forma de calcular la distancia entre 2 puntos en n dimensiones, es l raíz cuadrada de la suma del cuadrado de la diferencia del valor en cada componente de los puntos.
Por ejemplo. Llamemos P a (255,0,255), que es el color cian. Y llamemos Q a (255,255,0), que es el color amarillo.
Entonces Distancia = sqrt( (255-255)^2 + (0-255)^2 + (255-0)^2 ) = 360.62
