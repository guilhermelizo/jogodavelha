import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [tela, setTela] = useState("menu"); //State de validação das telas, setado como Menu para tela inicial
  const [jogadorAtual, setJogadorAtual] = useState(""); //State de seleção de jogador
  const [tabuleiro, setTabuleiro] = useState([]); //Matriz do Tabuleiro (3 por 3)
  const [jogadasRestantes, setJogadasRestantes] = useState(0); //State para as jogadas totais e saber se empatou
  const [ganhador, setGanhador] = useState(""); //State para armazenar e printar o jogador que ganhou

  //Função para iniciar o jogo
  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);
    setTabuleiro([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

    setTela("jogo");

    console.log("Trocou para tela de Jogo");
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");

    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    // IF De validação das LINHAS
    if (
      tabuleiro[linha][0] !== "" && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]
    ) {
      return finalizarJogo(tabuleiro[linha][0]);
    }

    // IF De validação das COLUNAS
    if (
      tabuleiro[0][coluna] !== "" && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna] 
    ) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    // IF De validação das DIAGONAIS
    //Diagonal 1
    if (
      tabuleiro[0][0] !== "" && tabuleiro [0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]
    ) {
      return finalizarJogo(tabuleiro[0][0]);
    }
    //Diagonal 2
    if (
      tabuleiro[0][2] !== "" && tabuleiro [0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]
    ) {
      return finalizarJogo(tabuleiro[0][2]);
    }

    //NENHUM GANHADOR
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo("");
    }
    //Jogo não finalizado
    setJogadasRestantes(jogadasRestantes - 1);
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela("ganhador");
  }

  switch (tela) {
    case "menu":
      return getTelaMenu();
    case "jogo":
      return getTelaJogo();
    case "ganhador":
      return getTelaGanhador();
  }

  //Abertura Tela Inicial >>>  getTelaMenu
  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador!</Text>

        {/* Box com os botões de cada jogador */}
        <View style={styles.inlineItens}>
          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo("X")}
          >
            <Text style={styles.jogadorX}> X </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo("O")}
          >
            <Text style={styles.jogadorO}> O </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } //Fechamento getTelaMenu
  // ----------------------------------

  //Abertura Tela de Jogo >>>  getTelaJogo
  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>

        {/* Map do JS para utilizar o tabuleiro já criado */}
        {tabuleiro.map((linha, numeroLinha) => {
          return (
            <View key={numeroLinha} style={styles.inlineItens}>
              {/* Map das linhas */}
              {linha.map((coluna, numeroColuna) => {
                return (
                  <TouchableOpacity
                    key={numeroColuna}
                    style={styles.boxJogador}
                    onPress={() => jogar(numeroLinha, numeroColuna)}
                    disabled={coluna !== ""} //Disabled comando do touchableOpacity, usado neste caso para desabilitar o click onde já estiver sido jogado
                  >
                    <Text
                      style={coluna === "X" ? styles.jogadorX : styles.jogadorO}
                    >
                      {coluna}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setTela("menu")}
        >
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  } //Fechamento getTelaJogo
  // ----------------------------------

  //Abertura Tela de Ganhador >>>  getTelaGanhador
  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Resultado Final!!!</Text>

        {/* Validação do ganhador */}
        {ganhador === "" && (
          <Text style={styles.ganhador}>Nenhum Ganhador</Text>
        )}
        {ganhador !== "" && (
          <>
            <Text style={styles.ganhador}>Ganhador</Text>
            <View style={styles.boxJogador}>
              <Text
                style={ganhador === "X" ? styles.jogadorX : styles.jogadorO}
              >
                {ganhador}
              </Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setTela("menu")}
        >
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  } //Fechamento getTelaGanhador
  // ----------------------------------
} // Fechamento função App()

// SEPARAÇÃO PARA O ESTILO ---------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  //Tela de Menu ----------------
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  subtitulo: {
    fontSize: 20,
    color: "#555",
    marginTop: 20,
  },
  boxJogador: {
    borderWidth: 1,
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5,
  },
  jogadorX: {
    fontSize: 40,
    color: "#553fda",
  },
  jogadorO: {
    fontSize: 40,
    color: "#da3f3f",
  },
  inlineItens: {
    flexDirection: "row",
  },

  botaoMenu: {
    marginTop: 20,
  },
  textoBotaoMenu: {
    color: "#4e6fe4",
  },
  ganhador: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
});
