export const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  return dateObj.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }); // "04/20/2023"
};

export const unescapeJSONString = (str) => {
  return str.replace(
    /\\(["\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    function (match, escapeSequence) {
      if (escapeSequence.startsWith("u")) {
        // Handle Unicode escape sequence
        const codePoint = parseInt(escapeSequence.substr(1), 16);
        return String.fromCodePoint(codePoint);
      } else {
        // Handle other escape sequences
        switch (escapeSequence) {
          case '\\"':
            return '"';
          case "\\\\":
            return "\\";
          case "\\/":
            return "/";
          case "\\b":
            return "\b";
          case "\\f":
            return "\f";
          case "\\n":
            return "\n";
          case "\\r":
            return "\r";
          case "\\t":
            return "\t";
          default:
            return match;
        }
      }
    }
  );
};

export const escapeJSONString = (str) => {
  return str.replace(/[\b\f\n\r\t\"\\]/g, function (char) {
    switch (char) {
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      case '"':
        return '\\"';
      case "\\":
        return "\\\\";
    }
  });
};
