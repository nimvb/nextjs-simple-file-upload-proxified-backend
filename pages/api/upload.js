import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
      bodyParser: false
    }
  };

const post = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        const target = files.file;
        const data = fs.readFileSync(target.filepath);
        fs.writeFileSync(`./public/${target.originalFilename}`, data);
        await fs.unlinkSync(target.filepath);
      return res.status(201).send("");
    });
  };

  export default function handler(req, res) {
      if(req.method == "POST"){
        post(req, res);
      }else{
        res.status(404).json({ name: 'invalid request' });
      }
  }
  