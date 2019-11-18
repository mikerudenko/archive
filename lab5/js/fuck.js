 public partial class Form1 : Form
    {
        public int n1, n2, n3;
        public double[] x1 = new double[100000];
        public double[] x2 = new double[100000];
        public double[] x3 = new double[100000];
        public double[] e1 = new double[100000];
        public double[] e2 = new double[100000];
        public double[] e3 = new double[100000];
         double A = 0;
         double B = 1;
         double h = 0.2;


/////////////////////////
/*         double function (double x,double y) // початкова фінкція
        {
             double otvet;
             //otvet = (1.0 + Math.Pow(y, 2.0)) / (1.0 + Math.Pow(x, 2.0));
             //otvet = 10.0 / 0.005 - ((10.0 + x) * Math.Exp(-x)) / 0.005 + (9.0 + x) * Math.Exp(-x) - y/0.005;//(x + 9) * Math.Pow(Math.E, -1 * x) + (10 - (10 + x) * Math.Pow(Math.E, -1 * x) - y) / 0.005;
             otvet = (10 - ((10 + x) * Math.Pow(Math.E, -x) + y)) / 0.05 + Math.Pow(Math.E, -(x)) * (9 + x);
             //otvet = y / x * Math.Log(y / x);
             return otvet; 
        }*/
/////////////////////////

         double functionderivative(double x, double y,double h) // похідна початкової функції
         {
             double otvet;
             //otvet = -1.0 + (h/24.0)*((18.0 * y) / (1.0 + x * x));
             otvet =-1* h * 81.6326 - 1;
             return otvet;
         }

         double functionup(double a,double b,double c,double x, double y ) // верхня функція (Ньютона)
         {
             double otvet;
             otvet = -y + c + b*function(x,y);
    
             return otvet;
         }


         double functionNut(double a, double b, double c, double x, double y,double h) // нижня функція (Ньютона)
         {
             double otvet;
             otvet = y - functionup(a,b,c,x,y)/functionderivative(x,y,h);
             return otvet;
         }

/*         double functionotvet(double x) // точний розв’язок
         {
             double otvet;
             //otvet = 10-(10+x)*Math.Pow(Math.E,x)+10*Math.Pow(Math.E,-(x/0.005));
             //otvet = Math.Exp(-x) * (-10.5789 * x - 105.18) + 15.1801 * Math.Exp(-20.0 * x) + 100.0;
             otvet = 10 - (10 + x) * Math.Pow(Math.E, -(x)) + 10 * Math.Pow(Math.E, (-(x) / 0.05));
             //otvet = x * Math.Exp(1 - x);
             return otvet;
         }*/

         double Nuton (double h,double x,double y,double x0, double [] Y)// Ньютон
            {
            
            double ylast;
            double ynew;
            double a = y;
            double b = 60.0*h/147.0;
             double c = (360.0*Y[5]-450.0*Y[4]+400.0*Y[3]-225.0*Y[2]+72.0*Y[1]-10.0*Y[0])/147.0;
             ylast= functionNut(a,b,c,x,y,h);
             ynew= functionNut(a,b,c,x,ylast,h);
             while (true)
             {
             ylast = ynew;
             ynew = functionNut(a,b,c,x,ylast,h);
                 if (Math.Abs(ylast-ynew)<0.0001){
                     break;
                 }
             }
             return ynew;
            }

         void AdamsMoulton(double h)// Ньютон
         {
             dataGridView1.Rows.Clear();
             double y=functionotvet(A);
             double K0, K1, K2, K3,K4,K5,K6,K7,K8,K9,K10;
             int j = 1;
             double[] Y = new double[6];
             Y[0] = functionotvet(A);
             int i = 1;
             dataGridView1.Rows.Add();

             //vivod pervoy sapici

             dataGridView1.Rows[0].Cells[0].Value = (String.Format("{0:0.000}", A));
             dataGridView1.Rows[0].Cells[1].Value = (String.Format("{0:0.0000}", y));
             dataGridView1.Rows[0].Cells[2].Value = (String.Format("{0:0.0000}", functionotvet(A)));
             dataGridView1.Rows[0].Cells[3].Value = (String.Format("{0:0.E+00 }", Math.Abs((functionotvet(A) - y) / functionotvet(A) * 100)));
             dataGridView1.Rows[0].Cells[4].Value = (String.Format("{0:0.0000 }", (functionotvet(A) - y)));


/*             if (radioButton1.Checked)
             {
                 x1[0]=Convert.ToDouble(dataGridView1.Rows[0].Cells[0].Value);
                 e1[0]=Convert.ToDouble(dataGridView1.Rows[0].Cells[4].Value);
             }
             if (radioButton2.Checked)
             {
                 x2[0] = Convert.ToDouble(dataGridView1.Rows[0].Cells[0].Value);
                 e2[0] = Convert.ToDouble(dataGridView1.Rows[0].Cells[4].Value);
             }
             if (radioButton3.Checked)
             {
                 x3[0] = Convert.ToDouble(dataGridView1.Rows[0].Cells[0].Value);
                 e3[0] = Convert.ToDouble(dataGridView1.Rows[0].Cells[4].Value);
             }*/

             for (double x = A; x <= B-h+0.0001; x += h)
             {
                 if (i < 6)
                 {
                    //k0 = h * function(x, y);
                    // //k0 = h * function(x, y);
                    //// y = y+h/2.0*(function(x,y)+function(x+h,y+k0));
                    // k1 = h * function(x + (h / 2.0), y + (k0 / 2.0));
                    // k2 = h * function(x + (h / 2.0), y + (k1 / 2.0));
                    // k3 = h * function(x + h, y + k2);
                    // y = y + (1 / 6.0) * (K0 + 2.0 * K1 + 2.0 * K2 + K3);
                     K0 = h * function(x, y);
                     K1 = h * function(x + 2.0 / 27.0 * h, y + 2.0 / 27.0 * K0);
                     K2 = h * function(x + 1.0 / 9.0 * h, y + 1.0 / 36.0 * K0 + 1.0 / 12.0 * K1);
                     K3 = h * function(x + 1.0 / 6.0 * h, y + 1.0 / 24.0 * K0 + 1.0 / 8.0 * K2);
                     K4 = h * function(x + 5.0 / 12.0 * h, y + 5.0 / 12.0 * K0 - 25.0 / 16.0 * K2 + 25.0 / 16.0 * K3);
                     K5 = h * function(x + 1.0 / 2.0 * h, y + 1.0 / 20.0 * K0 + 1.0 / 4.0 * K3 + 1.0 / 5.0 * K4);
                     K6 = h * function(x + 5.0 / 6.0 * h, y - 25.0 / 508.0 * K0 + 125.0 / 508.0 * K3 - 65.0 / 27.0 * K4 + 125.0 / 54.0 * K4);
                     K7 = h * function(x + 1.0 / 6.0 * h, y + 31.0 / 300.0 * K0 + 61.0 / 225.0 * K4 - 2.0 / 9.0 * K5 + 13.0 / 900.0 * K6);
                     K8 = h * function(x + 2.0 / 3.0 * h, y + 2.0 * K0 - 53.0 / 6.0 * K3 + 704.0 / 45.0 * K4 - 107.0 / 9.0 * K5 + 67.0 / 90.0 * K6 + 3.0 * K7);
                     K9 = h * function(x + 1.0 / 3.0 * h, y - 91.0 / 108.0 * K0 + 23.0 / 108.0 * K3 - 976.0 / 135.0 * K4 + 311.0 / 54.0 * K5 - 19.0 / 60.0 * K6 + 17.0 / 6.0 * K7 - 1.0 / 12.0 * K8);
                     K10 = h * function(x + h, y + 2383.0 / 4100.0 * K0 - 341.0 / 164.0 * K3 + 4496.0 / 1025.0 * K4 - 301.0 / 82.0 * K5 + 2133.0 / 4100.0 * K6 + 45.0 / 82.0 * K7 + 45.0 / 164.0 * K8 + 18.0 / 49.0 * K9);
                     y = y + 41.0 / 840.0 * K0 + 34.0 / 105.0 * K1 + 9.0 / 35.0 * (K6 + K7) + 9.0 / 280.0 * (K8 + K9) + 41.0 / 840.0 * K10;
                     Y[i] = y;
                     i++;
                     dataGridView1.Rows.Add();
                     dataGridView1.Rows[j].Cells[0].Value = (String.Format("{0:0.000}", x+h));
                     dataGridView1.Rows[j].Cells[1].Value = (String.Format("{0:0.0000}", y));
                     dataGridView1.Rows[j].Cells[2].Value = (String.Format("{0:0.0000}", functionotvet(x+h)));
                     dataGridView1.Rows[j].Cells[3].Value = (String.Format("{0:0.E+00 }",Math.Abs((functionotvet(x+h) - y) / functionotvet(x+h) * 100)));
                     dataGridView1.Rows[j].Cells[4].Value = (String.Format("{0:0.0000 }", (functionotvet(x+h) - y)));
                 }
                 else
                 {
                     y = Nuton(h, x+h , y, x,Y);
                         Y[0]=Y[1];
                         Y[1] = Y[2];
                         Y[2] = Y[3];
                         Y[3] = Y[4];
                         Y[4] = Y[5];
                         Y[5] = y;

                         //Запись одна
                         dataGridView1.Rows.Add();
                         dataGridView1.Rows[j].Cells[0].Value = (String.Format("{0:0.000}", x+h));
                         dataGridView1.Rows[j].Cells[1].Value = (String.Format("{0:0.0000}", y));
                         dataGridView1.Rows[j].Cells[2].Value = (String.Format("{0:0.0000}", functionotvet(x+h)));

                         dataGridView1.Rows[j].Cells[3].Value = (String.Format("{0:0.E+00 }", Math.Abs((functionotvet(x + h) - y) / functionotvet(x + h) * 100)));
                        dataGridView1.Rows[j].Cells[4].Value = (String.Format("{0:0.0000 }", (functionotvet(x + h) - y)));
                        
                 }

                /* if (radioButton1.Checked)
                 {
                     n1 = j;
                     x1[j] = Convert.ToDouble(dataGridView1.Rows[j].Cells[0].Value);
                     e1[j] = Convert.ToDouble(dataGridView1.Rows[j].Cells[4].Value);
                 }
                 if (radioButton2.Checked)
                 {
                     n2 = j;
                     x2[j] = Convert.ToDouble(dataGridView1.Rows[j].Cells[0].Value);
                     e2[j] = Convert.ToDouble(dataGridView1.Rows[j].Cells[4].Value);
                 }
                 if (radioButton3.Checked)
                 {
                     n3 = j;
                     x3[j] = Convert.ToDouble(dataGridView1.Rows[j].Cells[0].Value);
                     e3[j] = Convert.ToDouble(dataGridView1.Rows[j].Cells[4].Value);
                 }
                 j++;*/
                /* dataGridView1.Rows.Add(
                     x,
                     y,
                     0,
                     0,
                     0
                     );*/  
             }
   
         }

/*        public Form1()
        {
            InitializeComponent();
            
        }*/



        //Call functions  with diffrent params
        private void button1_Click(object sender, EventArgs e)
        {
            if (radioButton1.Checked)
            {
                h = 0.2;
            }
            if (radioButton2.Checked)
            {
                h = 0.2/5.0;
            }
            if (radioButton3.Checked)
            {
                h = 0.2/25.0;
            }

            AdamsMoulton(h);
            
            Form2 f = new Form2(this);
            
            f.Show();
            
        }



        // private void button7_Click(object sender, EventArgs e) { drowDodat(); }
        // public void drowDodat()
        // {
        //     InitializeComponent();
        //     GraphPane pane1 = zedGraphControl1.GraphPane;

        //     // Очистим список кривых на тот случай, если до этого сигналы уже были нарисованы
        //     pane1.CurveList.Clear();

        //     // Создадим список точек
        //     PointPairList list = new PointPairList();
        //   PointPairList list2 = new PointPairList();
        //   PointPairList list3 = new PointPairList();

/*                     
            for (int i = 0; i < n1; i++)
            {
                list.Add(x1[i], e1[i]);
             
            }
            for (int i = 0; i < n2; i++)
            {
                
                list2.Add(x2[i], e2[i]);
                

            }
            for (int i = 0; i < n3; i++)
            {
                

                list3.Add(x3[i], e3[i]);
            }
            
            LineItem myCurve = pane1.AddCurve("Функція e1", list, Color.Blue, SymbolType.None);
            LineItem myCurve2 = pane1.AddCurve("Функція e2", list2, Color.Red, SymbolType.None);
            LineItem myCurve3 = pane1.AddCurve("Функція e3", list3, Color.Black, SymbolType.None);
            zedGraph.AxisChange();
            pane1.Title.Text = "Графік";
            // Обновляем график
            zedGraph.Invalidate();
        }*/
/*
        private void radioButton1_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void radioButton2_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void zedGraph_Load(object sender, EventArgs e)
        {

        }*/

        /*        private void button2_Click(object sender, EventArgs e)
                {
                    AdamsMoulton(h/5.0);
                    Form2 f = new Form2(this);
                    f.Show();
                }

                private void button3_Click(object sender, EventArgs e)
                {
                    AdamsMoulton(h/21.0);
                    Form2 f = new Form2(this);
                    f.Show();
                }

                public void button4_Click(object sender, EventArgs e)
                {
                    //metodRKF4(h);
                    Form2 f = new Form2(this);
                    f.Show();
                }

                private void button5_Click(object sender, EventArgs e)
                {
                    //metodRKF4(h/5);
                    Form2 f = new Form2(this);
                    f.Show();
                }

                private void button6_Click(object sender, EventArgs e)
                {
                   // metodRKF4(h / 21);
                    Form2 f = new Form2(this);
                    f.Show();
                }*/
    }
}
