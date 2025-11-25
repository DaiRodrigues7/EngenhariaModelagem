# Guia de Teste - Sistema de Carrinho e Pagamento

## ✅ Correções Realizadas

### 1. **Armazenamento de Preço (produto.html)**
- **Antes**: `price: 139.90` (número)
- **Depois**: `price: 'R$ 139,90'` (string formatada)
- **Benefício**: Elimina erros de conversão de formato

### 2. **Função buyNow() (produto.html)**
- **Antes**: Não adicionava ao carrinho, apenas redirecionava
- **Depois**: Adiciona o produto ao carrinho E redireciona para pagamento
- **Benefício**: Funciona com "Comprar Agora" (direto para pagamento)

### 3. **Cálculo de Totais (pagamento.js)**
- **Melhorias**:
  - Trata preços em diferentes formatos (número ou string)
  - Valida cada item antes de calcular
  - Inclui debugging no console (verifique F12)
  - Carrega corretamente múltiplos produtos

---

## 🧪 Como Testar

### Teste 1: Um Único Produto
1. Abra `/html/produto.html`
2. Defina quantidade = 1
3. Clique em **"Comprar Agora"** ou **"Adicionar ao Carrinho"**
4. ✅ Deve ir para `/html/pagamento.html`
5. ✅ Valor total deve ser: **R$ 139,90 + R$ 15,00 de frete = R$ 154,90**

### Teste 2: Múltiplos Produtos (Mesmo Item)
1. Abra `/html/produto.html`
2. Defina quantidade = 2
3. Clique em **"Comprar Agora"**
4. Deve ir para pagamento
5. ✅ Valor total deve ser: **R$ 279,80 + R$ 15,00 frete = R$ 294,80**

### Teste 3: Múltiplos Produtos (Itens Diferentes)
1. Abra `/html/produto.html`
2. Defina quantidade = 1, clique em **"Adicionar ao Carrinho"**
3. Repita 2 vezes o passo anterior (total de 3 adições ao carrinho)
4. Abra `/html/pagamento.html` pelo carrinho ou diretamente
5. ✅ Deve exibir:
   - 3 linhas de produtos
   - Subtotal: **R$ 419,70** (R$ 139,90 × 3)
   - Frete: **Grátis** (acima de R$ 100)
   - Total: **R$ 419,70**

### Teste 4: Remover Itens
1. Na página de pagamento, clique no botão **✕** para remover um item
2. ✅ Os totais devem ser recalculados automaticamente
3. Se restar apenas 1 item (R$ 139,90), frete volta a **R$ 15,00**

---

## 🐛 Debug

Se algo não funcionar:

1. **Abra o Console** (F12 > Aba Console)
2. Procure pela mensagem de log "Carrinho atualizado:" com detalhes dos valores
3. Verifique se há erros em vermelho

**Exemplo de log correto:**
```
Carrinho atualizado: {
  itemsCount: 2,
  subtotal: "279.80",
  frete: "15.00",
  total: "294.80"
}
```

---

## 📋 Checklist Final

- [ ] Um produto: R$ 154,90 (R$ 139,90 + R$ 15,00)
- [ ] Dois produtos: R$ 294,80 (R$ 279,80 + R$ 15,00)
- [ ] Três produtos: R$ 419,70 (com frete grátis)
- [ ] Remover itens recalcula corretamente
- [ ] "Comprar Agora" adiciona e redireciona
- [ ] "Adicionar ao Carrinho" apenas adiciona

---

## 🚀 Notas

- O sistema agora suporta múltiplos produtos com preços individuais
- Qualidade de quantidade é respeitada no cálculo
- Frete é automaticamente grátis para subtotais > R$ 100
- Todos os valores são formatados corretamente (R$ com vírgula)
