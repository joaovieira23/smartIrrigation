import { StatusBar } from 'react-native';

export interface Tema {
  id: string;
  barStyle: StatusBar['props']['barStyle'];
  borderRadius: number;

  cores: {
    primaria: string;
    primaria80: string;
    secundaria: string;
    terciaria: string;
    placeholderButton: string;

    destaquePrimaria: string;

    destaque100: string;
    destaque400: string;
    destaque600: string;
    placeholderText: string;

    background: string;
    surface: string;
    borda: string;
    sombra: string;
    placeholder: string;

    indicadorPositivo: string;
    indicadorNegativo: string;
    indicadorNeutro: string;

    header: string;

    tabBar: {
      background: string;
      tabAtiva: string;
      tabInativa: string;
    };

    statusBar: string;

    texto: {
      enfase: string;
      subtexto: string;
      desabilitado: string;
      link: string;
    };

    input: {
      placeholder: string;
      defaultSelecionado: string;
      erro: string;
    };

    botao: {
      primaria: string;
      outlinedText: string;
      outlinedBorder: string;
    };

    switch: {
      track: string;
      thumb: string;
    };

    segmentedcontrol: {
      textoSelecionado: string;
      textoNaoSelecionado: string;
      backgroundSelecionado: string;
      backgroundNaoSelecionado: string;
    };
  };
}

const temaLight: Tema = {
  id: 'light',
  barStyle: 'dark-content',
  borderRadius: 5,

  cores: {
    primaria: '#95DE50',
    primaria80: 'rgba(149, 222, 80, 0.8)',
    secundaria: '#3E8512',
    terciaria: '#86C062',
    placeholderButton: '#CCEBBB',

    destaquePrimaria: 'rgba(134, 192, 98, 1)',

    destaque100: 'rgba(62, 133, 18, 1)',
    destaque400: '#366EC9',
    destaque600: 'rgba(48,97,177,100)',

    background: '#efefef',
    surface: 'rgba(255, 255, 255, 1)',
    borda: 'rgba(207, 238, 163, 1)',
    sombra: '#000',
    placeholder: 'rgba(128, 128, 140, 1)',
    placeholderText: '#F8F9FB',

    indicadorPositivo: '#35ab59',
    indicadorNegativo: '#E40C0A',
    indicadorNeutro: '#80808C',

    header: '#95DE50',

    tabBar: {
      background: '#fff',
      tabAtiva: '#95DE50',
      tabInativa: 'rgba(102,102,102,0.6)',
    },

    texto: {
      enfase: 'rgba(0, 0, 0, 0.87)',
      subtexto: 'rgba(90, 90, 99, 1)',
      link: '#95DE50',
      desabilitado: 'rgba(0, 0, 0, 0.38)',
    },

    segmentedcontrol: {
      textoSelecionado: '#95DE50',
      textoNaoSelecionado: 'rgba(0, 0, 0, 0.6)',
      backgroundSelecionado: 'rgba(64, 129, 236, 0.17)',
      backgroundNaoSelecionado: '#dedede',
    },

    input: {
      placeholder: 'rgba(0,0,0,0.6)',
      defaultSelecionado: '#95DE50',
      erro: '#F44336',
    },

    botao: {
      primaria: '#95DE50',
      outlinedText: '#95DE50',
      outlinedBorder: 'rgba(0, 0, 0, 0.3)',
    },

    switch: {
      track: '#A0C1F6',
      thumb: '#95DE50',
    },

    statusBar: 'rgba(48,97,177,100)',
  },
};

// const temaDark: Tema = {
// 	id: 'dark',
// 	barStyle: 'light-content',
// 	borderRadius: 5,

// 	cores: {
// 		primaria: '#4081EC',
// 		primaria80: 'rgba(64, 129, 236, 0.8)',
// 		secundaria: '#d9ad00',

// 		destaquePrimaria: '#346de0',

// 		destaque100: '#82b1ff',
// 		destaque400: '#366EC9',
// 		destaque600: 'rgba(48,97,177,100)',

// 		background: '#16171f',
// 		surface: '#242424',
// 		borda: 'rgba(255, 255, 255, 0.1)',
// 		sombra: 'rgba(255,255,255,0.1)',
// 		placeholder: 'rgba(255, 255, 255, 0.38)',

// 		indicadorPositivo: '#35ab59',
// 		indicadorNegativo: '#cb3d3d',

// 		header: '#1C1C1C',
// 		statusBar: '#1C1C1C',

// 		tabBar: {
// 			background: '#2f2f2f',
// 			tabAtiva: 'rgba(255, 255, 255, 0.87)',
// 			tabInativa: 'rgba(255, 255, 255, 0.38)',
// 		},

// 		texto: {
// 			enfase: 'rgba(255,255,255,0.87)',
// 			subtexto: 'rgba(255, 255, 255, 0.6)',
// 			link: '#4081EC',
// 			desabilitado: 'rgba(255, 255, 255, 0.38)',
// 		},

// 		input: {
// 			placeholder: 'rgba(255, 255, 255, 0.6)',
// 			defaultSelecionado: '#fff',
// 			erro: '#F44336',
// 		},

// 		botao: {
// 			primaria: '#4081ec',
// 			outlinedText: '#7985cb',
// 			outlinedBorder: 'rgba(255,255,255,0.3)',
// 		},

// 		switch: {
// 			track: '#A0C1F6',
// 			thumb: '#4081EC',
// 		},

// 		segmentedcontrol: {
// 			textoSelecionado: 'rgba(0, 0, 0, 0.87)',
// 			textoNaoSelecionado: 'rgba(255, 255, 255, 0.6)',
// 			backgroundSelecionado: 'rgba(255, 255, 255, 0.87)',
// 			backgroundNaoSelecionado: 'rgba(255, 255, 255, 0.2)',
// 		},
// 	},
// };

const temas: Record<'light', Tema> = {
  // dark: temaDark,
  light: temaLight,
};

export default temas;
