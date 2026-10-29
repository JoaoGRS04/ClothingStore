# Loja de Roupas

Simulação de uma loja online de roupas feita em TypeScript, criada para praticar a linguagem. Por enquanto o projeto roda inteiramente no navegador, sem backend e sem banco de dados, com os dados salvos no localStorage do navegador. Ele cobre o ciclo completo de uma compra: escolher produtos, montar o carrinho, adicionar saldo, finalizar o pedido e consultar o histórico.

![Screenshot da Loja](https://github.com/user-attachments/assets/d4e91c47-f06c-4390-a95d-3945c0d8535d)

## Funcionalidades

**Catálogo**
- Lista de produtos com indicação de estoque
- Filtro por categoria (camisetas, calças, jaquetas e calçados)
- Filtro por preço máximo, combinável com o filtro de categoria
- Detalhes do produto ao clicar no nome; os detalhes só fecham quando o produto aberto sai da lista filtrada

**Carrinho**
- Adicionar produtos (apenas os que têm estoque)
- Aumentar e diminuir a quantidade de cada item (`+` e `-`)
- Esvaziar o carrinho
- Total calculado automaticamente

**Saldo**
- Adicionar saldo
- Remover saldo (nunca deixa o saldo ficar negativo)
- Zerar o saldo
- Validação dos valores digitados (vazio, negativo e texto são recusados)

**Pedidos**
- Finalizar compra usando o saldo: só passa se o saldo cobrir o total
- Em caso de sucesso, o saldo é descontado, o carrinho é esvaziado e o pedido vai para o histórico
- O histórico guarda o preço pago na época da compra: alterar o preço de um produto depois não muda os pedidos antigos
- Histórico de pedidos recolhível, com os pedidos exibidos lado a lado
- Limpar o histórico

**Persistência**
- Carrinho, saldo e histórico de pedidos são salvos automaticamente no `localStorage`
- Ao recarregar a página, tudo continua como estava

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) como servidor de desenvolvimento
- HTML e CSS puros (sem frameworks)
- [Node.js](https://nodejs.org/) e npm para gerenciar o projeto
- [Web Storage API (`localStorage`)](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) para salvar os dados no navegador

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) (versão LTS).

```bash
# 1. Clone o repositório
git clone https://github.com/JoaoGRS04/ClothingStoreSimulator.git
cd ClothingStoreSimulator

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra no navegador o endereço que aparecer no terminal (geralmente `http://localhost:5173`).

## Estrutura do projeto

```
├── index.html          # Estrutura da página
├── src/
│   ├── main.ts         # Interface: eventos e desenho na tela
│   ├── products.ts     # Tipos e dados dos produtos
│   ├── catalog.ts      # Consultas: buscar, filtrar e formatar preço
│   ├── cart.ts         # Lógica do carrinho
│   ├── wallet.ts       # Lógica do saldo
│   ├── order.ts        # Finalização da compra e histórico de pedidos
│   └── style.css       # Estilos
├── package.json
└── tsconfig.json
```

## Regras de negócio

- Produto sem estoque não pode ser adicionado ao carrinho.
- Adicionar o mesmo produto de novo aumenta a quantidade, em vez de criar outra linha.
- Remover um item com quantidade 1 tira a linha do carrinho.
- Valores de saldo inválidos (vazio, texto, zero ou negativo) são recusados.
- Não é possível retirar mais saldo do que existe.
- A compra só é finalizada se o saldo cobrir o total, e a verificação acontece **antes** de qualquer alteração, para não deixar o estado inconsistente.
- Cada item do carrinho guarda uma **cópia do preço** do produto no momento em que é adicionado.
- Ao finalizar a compra, o pedido copia cada item do carrinho (cópia independente, com `map` + spread). Assim, esvaziar o carrinho não apaga o histórico e mudar o preço de um produto não altera pedidos já feitos.

## O que este projeto pratica

- Tipos, `interface` e *union types* (`Category`, `Cart`, `Orders`)
- Métodos de array: `find`, `filter`, `map`, `reduce`, `some`, `splice`
- Módulos com `import` e `export` (ES Modules)
- Tratamento de valores `undefined` e `null` (`?.`, `??` e estreitamento de tipos)
- Manipulação do DOM e eventos, incluindo *event delegation*
- Persistência no navegador com `localStorage`, `JSON.stringify` e `JSON.parse`
- Diferença entre passar valor e passar referência, e entre cópia rasa e cópia independente de objetos (spread)
- Separação entre lógica e interface
- Flexbox e CSS básico
