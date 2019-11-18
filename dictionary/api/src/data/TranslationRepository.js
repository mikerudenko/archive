const { requestPromise } = require('./requestPromise');

class TranslationRepository {
  static getNTokenUrl() {
    return `https://myefe.ru/anglijskaya-transkriptsiya.html`;
  }

  static getTranslationUrl(word) {
    return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${word}`;
  }

  static getTranscriptionUrl(token, body) {
    const words = encodeURIComponent(body)
      .split('%20')
      .join('&words%5B%5D=');
    return `https://myefe.ru/wp-admin/admin-ajax.php?_n=${token}&action=mlsw_api&dir=en-ru&func=get_words_info&sw=1&words%5B%5D=${words}`;
  }

  static async getWordData(word) {
    const token = await TranslationRepository.getToken();
    const translation = await TranslationRepository.getTranslation(word);
    const transcription = await TranslationRepository.getTranscription(
      token,
      word,
    );

    return {
      word,
      translation,
      transcription,
    };
  }

  static async getTranslation(word) {
    const content = await requestPromise(
      TranslationRepository.getTranslationUrl(word),
    );
    const payload = JSON.parse(content);
    return payload[0][0][0];
  }

  static async getTranscription(token, word) {
    const content = await requestPromise(
      TranslationRepository.getTranscriptionUrl(token, word),
    );
    const payload = JSON.parse(content);
    const transcription = payload.data
      .map(word =>
        !word.transc_data ? 'No transcription' : word.transc_data.transc_gb,
      )
      .join(' ');

    return transcription;
  }

  static async getToken() {
    const content = await requestPromise(TranslationRepository.getNTokenUrl());
    const noncePos = content.search(/nonce/);
    return content.slice(noncePos + 8, noncePos + 18);
  }
}

module.exports = {
  TranslationRepository
}