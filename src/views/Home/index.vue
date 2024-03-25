<template>
<div>
    <h1>Tela Home</h1>
    <div v-if="loading">
      Carregando...
    </div>
    <div v-else>
      <div v-for="assinatura in assinaturas" :key="assinatura['ID assinante']" class="assinatura">
        <h2>{{ assinatura['ID assinante'] }}</h2>
        <p><strong>Status:</strong> {{ assinatura.status }}</p>
        <p><strong>Valor:</strong> ${{ assinatura.valor.toFixed(2) }}</p>
        <p><strong>Data Início:</strong> {{ new Date(assinatura['data início']).toLocaleDateString() }}</p>
        <p><strong>Próximo Ciclo:</strong> {{ new Date(assinatura['próximo ciclo']).toLocaleDateString() }}</p>
        <p><strong>Quantidade de Cobranças:</strong> {{ assinatura['quantidade cobranças'] }}</p>
        <!-- Adicione mais detalhes conforme necessário -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api'; // Verifique o caminho para garantir que está correto

export default {
  setup() {
    const loading = ref(false);
    const assinaturas = ref([]);

    // Função para formatar moeda de forma apropriada
    const formatCurrency = (value) => {
      return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Função para buscar os dados da API
    const fetchData = async () => {
      loading.value = true;
      try {
        // Substitua '/getdata' pelo endpoint correto, se necessário
        const response = await api.get('/getdata');
        assinaturas.value = response.data.map(assinatura => ({
          ...assinatura,
          valor: formatCurrency(assinatura.valor)
        }));
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      } finally {
        loading.value = false;
      }
    };

    // Chama fetchData quando o componente é montado
    onMounted(fetchData);

    return {
      loading,
      assinaturas
    };
  },
};
</script>